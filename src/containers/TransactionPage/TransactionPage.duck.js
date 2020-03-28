import pick from 'lodash/pick';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import config from '../../config';
import { types as sdkTypes } from '../../util/sdkLoader';
import { isTransactionsTransitionInvalidTransition, storableError } from '../../util/errors';
import {
  txIsEnquired,
  getReview1Transition,
  getReview2Transition,
  txIsInFirstReviewBy,
  TRANSITION_ACCEPT,
  TRANSITION_DECLINE,
  TRANSITION_COMPLETE,
  TRANSITION_ACCEPT_BY_CUSTOMER,
  TRANSITION_DECLINED_BY_CUSTOMER,
  TRANSITION_COMPLETE_BY_PROVIDER_IN_CANCEL_PENDING,
  TRANSITION_CUSTOMER_CANCEL_AFTER_EXPIRE,
  TRANSITION_COMPLETE_BY_PROVIDER_AFTER_EXPIRE,
} from '../../util/transaction';
import * as log from '../../util/log';
import {
  updatedEntities,
  denormalisedEntities,
  denormalisedResponseEntities,
} from '../../util/data';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { fetchCurrentUserNotifications } from '../../ducks/user.duck';

const { UUID } = sdkTypes;

const MESSAGES_PAGE_SIZE = 100;
const CUSTOMER = 'customer';

// ================ Action types ================ //

export const SET_INITAL_VALUES = 'app/TransactionPage/SET_INITIAL_VALUES';

export const FETCH_TRANSACTION_REQUEST = 'app/TransactionPage/FETCH_TRANSACTION_REQUEST';
export const FETCH_TRANSACTION_SUCCESS = 'app/TransactionPage/FETCH_TRANSACTION_SUCCESS';
export const FETCH_TRANSACTION_ERROR = 'app/TransactionPage/FETCH_TRANSACTION_ERROR';

export const FETCH_TRANSITIONS_REQUEST = 'app/TransactionPage/FETCH_TRANSITIONS_REQUEST';
export const FETCH_TRANSITIONS_SUCCESS = 'app/TransactionPage/FETCH_TRANSITIONS_SUCCESS';
export const FETCH_TRANSITIONS_ERROR = 'app/TransactionPage/FETCH_TRANSITIONS_ERROR';

export const ACCEPT_SALE_REQUEST = 'app/TransactionPage/ACCEPT_SALE_REQUEST';
export const ACCEPT_SALE_SUCCESS = 'app/TransactionPage/ACCEPT_SALE_SUCCESS';
export const ACCEPT_SALE_ERROR = 'app/TransactionPage/ACCEPT_SALE_ERROR';

export const DECLINE_SALE_REQUEST = 'app/TransactionPage/DECLINE_SALE_REQUEST';
export const DECLINE_SALE_SUCCESS = 'app/TransactionPage/DECLINE_SALE_SUCCESS';
export const DECLINE_SALE_ERROR = 'app/TransactionPage/DECLINE_SALE_ERROR';

export const FETCH_MESSAGES_REQUEST = 'app/TransactionPage/FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'app/TransactionPage/FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_ERROR = 'app/TransactionPage/FETCH_MESSAGES_ERROR';

export const SEND_MESSAGE_REQUEST = 'app/TransactionPage/SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'app/TransactionPage/SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_ERROR = 'app/TransactionPage/SEND_MESSAGE_ERROR';

export const SEND_REVIEW_REQUEST = 'app/TransactionPage/SEND_REVIEW_REQUEST';
export const SEND_REVIEW_SUCCESS = 'app/TransactionPage/SEND_REVIEW_SUCCESS';
export const SEND_REVIEW_ERROR = 'app/TransactionPage/SEND_REVIEW_ERROR';

export const FETCH_TIME_SLOTS_REQUEST = 'app/TransactionPage/FETCH_TIME_SLOTS_REQUEST';
export const FETCH_TIME_SLOTS_SUCCESS = 'app/TransactionPage/FETCH_TIME_SLOTS_SUCCESS';
export const FETCH_TIME_SLOTS_ERROR = 'app/TransactionPage/FETCH_TIME_SLOTS_ERROR';


export const COMPLETE_BY_PROVIDER_REQUEST = 'app/TransactionPage/COMPLETE_BY_PROVIDER_REQUEST';
export const COMPLETE_BY_PROVIDER_SUCCESS = 'app/TransactionPage/COMPLETE_BY_PROVIDER_SUCCESS';
export const COMPLETE_BY_PROVIDER_ERROR = 'app/TransactionPage/COMPLETE_BY_PROVIDER_ERROR';

export const ACCEPT_BY_CUSTOMER_REQUEST = 'app/TransactionPage/ACCEPT_BY_CUSTOMER_REQUEST';
export const ACCEPT_BY_CUSTOMER_SUCCESS = 'app/TransactionPage/ACCEPT_BY_CUSTOMER_SUCCESS';
export const ACCEPT_BY_CUSTOMER_ERROR = 'app/TransactionPage/ACCEPT_BY_CUSTOMER_ERROR';


export const DECLINED_BY_CUSTOMER_REQUEST = 'app/TransactionPage/DECLINED_BY_CUSTOMER_REQUEST';
export const DECLINED_BY_CUSTOMER_SUCCESS = 'app/TransactionPage/DECLINED_BY_CUSTOMER_SUCCESS';
export const DECLINED_BY_CUSTOMER_ERROR = 'app/TransactionPage/DECLINED_BY_CUSTOMER_ERROR';


export const COMPLETE_BY_PROVIDER_IN_CANCEL_PENDING_REQUEST = 'app/TransactionPage/COMPLETE_BY_PROVIDER_IN_CANCEL_PENDING_REQUEST';
export const COMPLETE_BY_PROVIDER_IN_CANCEL_PENDING_SUCCESS = 'app/TransactionPage/COMPLETE_BY_PROVIDER_IN_CANCEL_PENDING_SUCCESS';
export const COMPLETE_BY_PROVIDER_IN_CANCEL_PENDING_ERROR = 'app/TransactionPage/COMPLETE_BY_PROVIDER_IN_CANCEL_PENDING_ERROR';


export const CUSTOMER_CANCEL_AFTER_EXPIRE_REQUEST = 'app/TransactionPage/CUSTOMER_CANCEL_AFTER_EXPIRE_REQUEST';
export const CUSTOMER_CANCEL_AFTER_EXPIRE_SUCCESS = 'app/TransactionPage/CUSTOMER_CANCEL_AFTER_EXPIRE_SUCCESS';
export const CUSTOMER_CANCEL_AFTER_EXPIRE_ERROR = 'app/TransactionPage/CUSTOMER_CANCEL_AFTER_EXPIRE_ERROR';


export const COMPLETE_BY_THE_PROVIDER_AFTER_EXPIRE_REQUEST = 'app/TransactionPage/COMPLETE_BY_THE_PROVIDER_AFTER_EXPIRE_REQUEST';
export const COMPLETE_BY_THE_PROVIDER_AFTER_EXPIRE_SUCCESS = 'app/TransactionPage/COMPLETE_BY_THE_PROVIDER_AFTER_EXPIRE_SUCCESS';
export const COMPLETE_BY_THE_PROVIDER_AFTER_EXPIRE_ERROR = 'app/TransactionPage/COMPLETE_BY_THE_PROVIDER_AFTER_EXPIRE_ERROR';

// ================ Reducer ================ //

const initialState = {
  fetchTransactionInProgress: false,
  fetchTransactionError: null,
  transactionRef: null,
  acceptInProgress: false,

  completeByProviderInProgress: false,
  acceptByCustomerInProgress: false,
  declinedByCustomerInProgress: false,
  completeByProviderInCancelPendingInProgress: false,
  customerCancelAfterExpireInProgress: false,
  completeByTheProviderAfterExpireInProgress: false,

  completeByProviderError: null,
  acceptByCustomerError: null,
  declinedByCustomerError: null,
  completeByProviderInCancelPendingError: null,
  customerCancelAfterExpireError: null,
  completeByTheProviderAfterExpireError: null,


  acceptSaleError: null,
  declineInProgress: false,
  declineSaleError: null,
  fetchMessagesInProgress: false,
  fetchMessagesError: null,
  totalMessages: 0,
  totalMessagePages: 0,
  oldestMessagePageFetched: 0,
  messages: [],
  initialMessageFailedToTransaction: null,
  savePaymentMethodFailed: false,
  sendMessageInProgress: false,
  sendMessageError: null,
  sendReviewInProgress: false,
  sendReviewError: null,
  timeSlots: null,
  fetchTimeSlotsError: null,
  fetchTransitionsInProgress: false,
  fetchTransitionsError: null,
  processTransitions: null,
};

// Merge entity arrays using ids, so that conflicting items in newer array (b) overwrite old values (a).
// const a = [{ id: { uuid: 1 } }, { id: { uuid: 3 } }];
// const b = [{ id: : { uuid: 2 } }, { id: : { uuid: 1 } }];
// mergeEntityArrays(a, b)
// => [{ id: { uuid: 3 } }, { id: : { uuid: 2 } }, { id: : { uuid: 1 } }]
const mergeEntityArrays = (a, b) => {
  return a.filter(aEntity => !b.find(bEntity => aEntity.id.uuid === bEntity.id.uuid)).concat(b);
};

export default function checkoutPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_INITAL_VALUES:
      return { ...initialState, ...payload };

    case FETCH_TRANSACTION_REQUEST:
      return { ...state, fetchTransactionInProgress: true, fetchTransactionError: null };
    case FETCH_TRANSACTION_SUCCESS: {
      const transactionRef = { id: payload.data.data.id, type: 'transaction' };
      return { ...state, fetchTransactionInProgress: false, transactionRef };
    }
    case FETCH_TRANSACTION_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, fetchTransactionInProgress: false, fetchTransactionError: payload };

    case FETCH_TRANSITIONS_REQUEST:
      return { ...state, fetchTransitionsInProgress: true, fetchTransitionsError: null };
    case FETCH_TRANSITIONS_SUCCESS:
      return { ...state, fetchTransitionsInProgress: false, processTransitions: payload };
    case FETCH_TRANSITIONS_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, fetchTransitionsInProgress: false, fetchTransitionsError: payload };

    case ACCEPT_SALE_REQUEST:
      return { ...state, acceptInProgress: true, acceptSaleError: null, declineSaleError: null };
    case ACCEPT_SALE_SUCCESS:
      return { ...state, acceptInProgress: false };
    case ACCEPT_SALE_ERROR:
      return { ...state, acceptInProgress: false, acceptSaleError: payload };


    case COMPLETE_BY_PROVIDER_REQUEST:
      return { ...state, completeByProviderInProgress: true, completeByProviderError: null };
    case COMPLETE_BY_PROVIDER_SUCCESS:
      return { ...state, completeByProviderInProgress: false };
    case COMPLETE_BY_PROVIDER_ERROR:
      return { ...state, completeByProviderInProgress: false, completeByProviderError: payload };

    case ACCEPT_BY_CUSTOMER_REQUEST:
      return { ...state, acceptByCustomerInProgress: true, acceptByCustomerError: null };
    case ACCEPT_BY_CUSTOMER_SUCCESS:
      return { ...state, acceptByCustomerInProgress: false };
    case ACCEPT_BY_CUSTOMER_ERROR:
      return { ...state, acceptByCustomerInProgress: false, acceptByCustomerError: payload };

    case DECLINED_BY_CUSTOMER_REQUEST:
      return { ...state, declinedByCustomerInProgress: true, declinedByCustomerError: null };
    case DECLINED_BY_CUSTOMER_SUCCESS:
      return { ...state, declinedByCustomerInProgress: false };
    case DECLINED_BY_CUSTOMER_ERROR:
      return { ...state, declinedByCustomerInProgress: false, declinedByCustomerError: payload };

    case COMPLETE_BY_PROVIDER_IN_CANCEL_PENDING_REQUEST:
      return {
        ...state,
        completeByProviderInCancelPendingInProgress: true,
        completeByProviderInCancelPendingError: null,
      };
    case COMPLETE_BY_PROVIDER_IN_CANCEL_PENDING_SUCCESS:
      return { ...state, completeByProviderInCancelPendingInProgress: false };
    case COMPLETE_BY_PROVIDER_IN_CANCEL_PENDING_ERROR:
      return {
        ...state,
        completeByProviderInCancelPendingInProgress: false,
        completeByProviderInCancelPendingError: payload,
      };

    case CUSTOMER_CANCEL_AFTER_EXPIRE_REQUEST:
      return { ...state, customerCancelAfterExpireInProgress: true, customerCancelAfterExpireError: null };
    case CUSTOMER_CANCEL_AFTER_EXPIRE_SUCCESS:
      return { ...state, customerCancelAfterExpireInProgress: false };
    case CUSTOMER_CANCEL_AFTER_EXPIRE_ERROR:
      return { ...state, customerCancelAfterExpireInProgress: false, customerCancelAfterExpireError: payload };

    case COMPLETE_BY_THE_PROVIDER_AFTER_EXPIRE_REQUEST:
      return {
        ...state,
        completeByTheProviderAfterExpireInProgress: true,
        completeByTheProviderAfterExpireError: null,
      };
    case COMPLETE_BY_THE_PROVIDER_AFTER_EXPIRE_SUCCESS:
      return { ...state, completeByTheProviderAfterExpireInProgress: false };
    case COMPLETE_BY_THE_PROVIDER_AFTER_EXPIRE_ERROR:
      return {
        ...state,
        completeByTheProviderAfterExpireInProgress: false,
        completeByTheProviderAfterExpireError: payload,
      };


    case DECLINE_SALE_REQUEST:
      return { ...state, declineInProgress: true, declineSaleError: null, acceptSaleError: null };
    case DECLINE_SALE_SUCCESS:
      return { ...state, declineInProgress: false };
    case DECLINE_SALE_ERROR:
      return { ...state, declineInProgress: false, declineSaleError: payload };

    case FETCH_MESSAGES_REQUEST:
      return { ...state, fetchMessagesInProgress: true, fetchMessagesError: null };
    case FETCH_MESSAGES_SUCCESS: {
      const oldestMessagePageFetched =
        state.oldestMessagePageFetched > payload.page
          ? state.oldestMessagePageFetched
          : payload.page;
      return {
        ...state,
        fetchMessagesInProgress: false,
        messages: mergeEntityArrays(state.messages, payload.messages),
        totalMessages: payload.totalItems,
        totalMessagePages: payload.totalPages,
        oldestMessagePageFetched,
      };
    }
    case FETCH_MESSAGES_ERROR:
      return { ...state, fetchMessagesInProgress: false, fetchMessagesError: payload };

    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        sendMessageInProgress: true,
        sendMessageError: null,
        initialMessageFailedToTransaction: null,
      };
    case SEND_MESSAGE_SUCCESS:
      return { ...state, sendMessageInProgress: false };
    case SEND_MESSAGE_ERROR:
      return { ...state, sendMessageInProgress: false, sendMessageError: payload };

    case SEND_REVIEW_REQUEST:
      return { ...state, sendReviewInProgress: true, sendReviewError: null };
    case SEND_REVIEW_SUCCESS:
      return { ...state, sendReviewInProgress: false };
    case SEND_REVIEW_ERROR:
      return { ...state, sendReviewInProgress: false, sendReviewError: payload };

    case FETCH_TIME_SLOTS_REQUEST:
      return { ...state, fetchTimeSlotsError: null };
    case FETCH_TIME_SLOTS_SUCCESS:
      return { ...state, timeSlots: payload };
    case FETCH_TIME_SLOTS_ERROR:
      return { ...state, fetchTimeSlotsError: payload };

    default:
      return state;
  }
}

// ================ Selectors ================ //

export const acceptOrDeclineInProgress = state => {
  return state.TransactionPage.acceptInProgress || state.TransactionPage.declineInProgress;
};

// ================ Action creators ================ //
export const setInitialValues = initialValues => ({
  type: SET_INITAL_VALUES,
  payload: pick(initialValues, Object.keys(initialState)),
});

const fetchTransactionRequest = () => ({ type: FETCH_TRANSACTION_REQUEST });
const fetchTransactionSuccess = response => ({
  type: FETCH_TRANSACTION_SUCCESS,
  payload: response,
});
const fetchTransactionError = e => ({ type: FETCH_TRANSACTION_ERROR, error: true, payload: e });

const fetchTransitionsRequest = () => ({ type: FETCH_TRANSITIONS_REQUEST });
const fetchTransitionsSuccess = response => ({
  type: FETCH_TRANSITIONS_SUCCESS,
  payload: response,
});
const fetchTransitionsError = e => ({ type: FETCH_TRANSITIONS_ERROR, error: true, payload: e });

const completeByProviderRequest = () => ({ type: COMPLETE_BY_PROVIDER_REQUEST });
const completeByProviderSuccess = () => ({ type: COMPLETE_BY_PROVIDER_SUCCESS });
const completeByProviderError = e => ({ type: COMPLETE_BY_PROVIDER_ERROR, error: true, payload: e });


const acceptByCustomerRequest = () => ({ type: ACCEPT_BY_CUSTOMER_REQUEST });
const acceptByCustomerSuccess = () => ({ type: ACCEPT_BY_CUSTOMER_SUCCESS });
const acceptByCustomerError = e => ({ type: ACCEPT_BY_CUSTOMER_ERROR, error: true, payload: e });


const declinedByCustomerRequest = () => ({ type: DECLINED_BY_CUSTOMER_REQUEST });
const declinedByCustomerSuccess = () => ({ type: DECLINED_BY_CUSTOMER_SUCCESS });
const declinedByCustomerError = e => ({ type: DECLINED_BY_CUSTOMER_ERROR, error: true, payload: e });


const completeByProviderInCancelPendingRequest = () => ({ type: COMPLETE_BY_PROVIDER_IN_CANCEL_PENDING_REQUEST });
const completeByProviderInCancelPendingSuccess = () => ({ type: COMPLETE_BY_PROVIDER_IN_CANCEL_PENDING_SUCCESS });
const completeByProviderInCancelPendingError = e => ({
  type: COMPLETE_BY_PROVIDER_IN_CANCEL_PENDING_ERROR,
  error: true,
  payload: e,
});


const customerCancelAfterExpireRequest = () => ({ type: CUSTOMER_CANCEL_AFTER_EXPIRE_REQUEST });
const customerCancelAfterExpireSuccess = () => ({ type: CUSTOMER_CANCEL_AFTER_EXPIRE_SUCCESS });
const customerCancelAfterExpireError = e => ({ type: CUSTOMER_CANCEL_AFTER_EXPIRE_ERROR, error: true, payload: e });


const completeByTheProviderAfterExpireRequest = () => ({ type: COMPLETE_BY_THE_PROVIDER_AFTER_EXPIRE_REQUEST });
const completeByTheProviderAfterExpireSuccess = () => ({ type: COMPLETE_BY_THE_PROVIDER_AFTER_EXPIRE_SUCCESS });
const completeByTheProviderAfterExpireError = e => ({
  type: COMPLETE_BY_THE_PROVIDER_AFTER_EXPIRE_ERROR,
  error: true,
  payload: e,
});


const acceptSaleRequest = () => ({ type: ACCEPT_SALE_REQUEST });
const acceptSaleSuccess = () => ({ type: ACCEPT_SALE_SUCCESS });
const acceptSaleError = e => ({ type: ACCEPT_SALE_ERROR, error: true, payload: e });


const declineSaleRequest = () => ({ type: DECLINE_SALE_REQUEST });
const declineSaleSuccess = () => ({ type: DECLINE_SALE_SUCCESS });
const declineSaleError = e => ({ type: DECLINE_SALE_ERROR, error: true, payload: e });

const fetchMessagesRequest = () => ({ type: FETCH_MESSAGES_REQUEST });
const fetchMessagesSuccess = (messages, pagination) => ({
  type: FETCH_MESSAGES_SUCCESS,
  payload: { messages, ...pagination },
});
const fetchMessagesError = e => ({ type: FETCH_MESSAGES_ERROR, error: true, payload: e });

const sendMessageRequest = () => ({ type: SEND_MESSAGE_REQUEST });
const sendMessageSuccess = () => ({ type: SEND_MESSAGE_SUCCESS });
const sendMessageError = e => ({ type: SEND_MESSAGE_ERROR, error: true, payload: e });

const sendReviewRequest = () => ({ type: SEND_REVIEW_REQUEST });
const sendReviewSuccess = () => ({ type: SEND_REVIEW_SUCCESS });
const sendReviewError = e => ({ type: SEND_REVIEW_ERROR, error: true, payload: e });

const fetchTimeSlotsRequest = () => ({ type: FETCH_TIME_SLOTS_REQUEST });
const fetchTimeSlotsSuccess = timeSlots => ({
  type: FETCH_TIME_SLOTS_SUCCESS,
  payload: timeSlots,
});
const fetchTimeSlotsError = e => ({
  type: FETCH_TIME_SLOTS_ERROR,
  error: true,
  payload: e,
});

// ================ Thunks ================ //

const listingRelationship = txResponse => {
  return txResponse.data.data.relationships.listing.data;
};

export const fetchTransaction = (id, txRole) => (dispatch, getState, sdk) => {
  dispatch(fetchTransactionRequest());
  let txResponse = null;

  return sdk.transactions
    .show(
      {
        id,
        include: [
          'customer',
          'customer.profileImage',
          'provider',
          'provider.profileImage',
          'listing',
          'booking',
          'reviews',
          'reviews.author',
          'reviews.subject',
        ],
        ...IMAGE_VARIANTS,
      },
      { expand: true },
    )
    .then(response => {
      txResponse = response;
      const listingId = listingRelationship(response).id;
      const entities = updatedEntities({}, response.data);
      const listingRef = { id: listingId, type: 'listing' };
      const transactionRef = { id, type: 'transaction' };
      const denormalised = denormalisedEntities(entities, [listingRef, transactionRef]);
      const listing = denormalised[0];
      const transaction = denormalised[1];

      // Fetch time slots for transactions that are in enquired state
      const canFetchTimeslots =
        txRole === 'customer' &&
        config.enableAvailability &&
        transaction &&
        txIsEnquired(transaction);

      if (canFetchTimeslots) {
        dispatch(fetchTimeSlots(listingId));
      }

      const canFetchListing = listing && listing.attributes && !listing.attributes.deleted;
      if (canFetchListing) {
        return sdk.listings.show({
          id: listingId,
          include: ['author', 'author.profileImage', 'images'],
          ...IMAGE_VARIANTS,
        });
      } else {
        return response;
      }
    })
    .then(response => {
      dispatch(addMarketplaceEntities(txResponse));
      dispatch(addMarketplaceEntities(response));
      dispatch(fetchTransactionSuccess(txResponse));
      return response;
    })
    .catch(e => {
      dispatch(fetchTransactionError(storableError(e)));
      throw e;
    });
};


export const acceptSale = id => (dispatch, getState, sdk) => {
  if (acceptOrDeclineInProgress(getState())) {
    return Promise.reject(new Error('Accept or decline already in progress'));
  }
  dispatch(acceptSaleRequest());
  console.log('accept', id);
  console.log('sdk accept', sdk);
  return sdk.transactions
    .transition({ id, transition: TRANSITION_ACCEPT, params: {} }, { expand: true })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(acceptSaleSuccess());
      dispatch(fetchCurrentUserNotifications());
      return response;
    })
    .catch(e => {
      dispatch(acceptSaleError(storableError(e)));
      log.error(e, 'accept-sale-failed', {
        txId: id,
        transition: TRANSITION_ACCEPT,
      });
      throw e;
    });
};


export const completeByProvider = id => (dispatch, getState, sdk) => {

  dispatch(completeByProviderRequest());
  return sdk.transactions
    .transition({ id, transition: TRANSITION_COMPLETE, params: {} }, { expand: true })
    .then(response => {
      dispatch(completeByProviderSuccess());
      return response;
    })
    .catch(e => {
      dispatch(completeByProviderError(e));
      log.error(e, 'complete-sale-failed', {
        txId: id,
        transition: TRANSITION_COMPLETE,
      });
      throw e;
    });
};


export const acceptByCustomer = id => (dispatch, getState, sdk) => {

  dispatch(acceptByCustomerRequest());
  return sdk.transactions
    .transition({ id, transition: TRANSITION_ACCEPT_BY_CUSTOMER, params: {} }, { expand: true })
    .then(response => {
      dispatch(acceptByCustomerSuccess());
      return response;
    })
    .catch(e => {
      dispatch(acceptByCustomerError(e));
      log.error(e, 'complete-sale-failed', {
        txId: id,
        transition: TRANSITION_ACCEPT_BY_CUSTOMER,
      });
      throw e;
    });
};

export const declinedByCustomer = id => (dispatch, getState, sdk) => {

  dispatch(declinedByCustomerRequest());
  return sdk.transactions
    .transition({ id, transition: TRANSITION_DECLINED_BY_CUSTOMER, params: {} }, { expand: true })
    .then(response => {
      dispatch(declinedByCustomerSuccess());
      return response;
    })
    .catch(e => {
      dispatch(declinedByCustomerError(e));
      log.error(e, 'complete-sale-failed', {
        txId: id,
        transition: TRANSITION_DECLINED_BY_CUSTOMER,
      });
      throw e;
    });
};


export const completeByProviderInCancelPending = id => (dispatch, getState, sdk) => {

  dispatch(completeByProviderInCancelPendingRequest());
  return sdk.transactions
    .transition({ id, transition: TRANSITION_COMPLETE_BY_PROVIDER_IN_CANCEL_PENDING, params: {} }, { expand: true })
    .then(response => {
      dispatch(completeByProviderInCancelPendingSuccess());
      return response;
    })
    .catch(e => {
      dispatch(completeByProviderInCancelPendingError(e));
      log.error(e, 'complete-sale-failed', {
        txId: id,
        transition: TRANSITION_COMPLETE_BY_PROVIDER_IN_CANCEL_PENDING,
      });
      throw e;
    });
};

export const customerCancelAfterExpire = id => (dispatch, getState, sdk) => {

  dispatch(customerCancelAfterExpireRequest());
  return sdk.transactions
    .transition({ id, transition: TRANSITION_CUSTOMER_CANCEL_AFTER_EXPIRE, params: {} }, { expand: true })
    .then(response => {
      dispatch(customerCancelAfterExpireSuccess());
      return response;
    })
    .catch(e => {
      dispatch(customerCancelAfterExpireError(e));
      log.error(e, 'complete-sale-failed', {
        txId: id,
        transition: TRANSITION_CUSTOMER_CANCEL_AFTER_EXPIRE,
      });
      throw e;
    });
};


export const completeByTheProviderAfterExpire = id => (dispatch, getState, sdk) => {

  dispatch(completeByTheProviderAfterExpireRequest());
  return sdk.transactions
    .transition({ id, transition: TRANSITION_COMPLETE_BY_PROVIDER_AFTER_EXPIRE, params: {} }, { expand: true })
    .then(response => {
      dispatch(completeByTheProviderAfterExpireSuccess());
      return response;
    })
    .catch(e => {
      dispatch(completeByTheProviderAfterExpireError(e));
      log.error(e, 'complete-sale-failed', {
        txId: id,
        transition: TRANSITION_COMPLETE_BY_PROVIDER_AFTER_EXPIRE,
      });
      throw e;
    });
};


export const declineSale = id => (dispatch, getState, sdk) => {
  if (acceptOrDeclineInProgress(getState())) {
    return Promise.reject(new Error('Accept or decline already in progress'));
  }
  dispatch(declineSaleRequest());

  return sdk.transactions
    .transition({ id, transition: TRANSITION_DECLINE, params: {} }, { expand: true })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(declineSaleSuccess());
      dispatch(fetchCurrentUserNotifications());
      return response;
    })
    .catch(e => {
      dispatch(declineSaleError(storableError(e)));
      log.error(e, 'reject-sale-failed', {
        txId: id,
        transition: TRANSITION_DECLINE,
      });
      throw e;
    });
};

const fetchMessages = (txId, page) => (dispatch, getState, sdk) => {
  const paging = { page, per_page: MESSAGES_PAGE_SIZE };
  dispatch(fetchMessagesRequest());

  return sdk.messages
    .query({
      transaction_id: txId,
      include: ['sender', 'sender.profileImage'],
      ...IMAGE_VARIANTS,
      ...paging,
    })
    .then(response => {
      const messages = denormalisedResponseEntities(response);
      const { totalItems, totalPages, page: fetchedPage } = response.data.meta;
      const pagination = { totalItems, totalPages, page: fetchedPage };
      const totalMessages = getState().TransactionPage.totalMessages;

      // Original fetchMessages call succeeded
      dispatch(fetchMessagesSuccess(messages, pagination));

      // Check if totalItems has changed between fetched pagination pages
      // if totalItems has changed, fetch first page again to include new incoming messages.
      // TODO if there're more than 100 incoming messages,
      // this should loop through most recent pages instead of fetching just the first one.
      if (totalItems > totalMessages && page > 1) {
        dispatch(fetchMessages(txId, 1))
          .then(() => {
            // Original fetch was enough as a response for user action,
            // this just includes new incoming messages
          })
          .catch(() => {
            // Background update, no need to to do anything atm.
          });
      }
    })
    .catch(e => {
      dispatch(fetchMessagesError(storableError(e)));
      throw e;
    });
};

export const fetchMoreMessages = txId => (dispatch, getState, sdk) => {
  const state = getState();
  const { oldestMessagePageFetched, totalMessagePages } = state.TransactionPage;
  const hasMoreOldMessages = totalMessagePages > oldestMessagePageFetched;

  // In case there're no more old pages left we default to fetching the current cursor position
  const nextPage = hasMoreOldMessages ? oldestMessagePageFetched + 1 : oldestMessagePageFetched;

  return dispatch(fetchMessages(txId, nextPage));
};

export const sendMessage = (txId, message) => (dispatch, getState, sdk) => {
  dispatch(sendMessageRequest());

  return sdk.messages
    .send({ transactionId: txId, content: message })
    .then(response => {
      const messageId = response.data.data.id;

      // We fetch the first page again to add sent message to the page data
      // and update possible incoming messages too.
      // TODO if there're more than 100 incoming messages,
      // this should loop through most recent pages instead of fetching just the first one.
      return dispatch(fetchMessages(txId, 1))
        .then(() => {
          dispatch(sendMessageSuccess());
          return messageId;
        })
        .catch(() => dispatch(sendMessageSuccess()));
    })
    .catch(e => {
      dispatch(sendMessageError(storableError(e)));
      // Rethrow so the page can track whether the sending failed, and
      // keep the message in the form for a retry.
      throw e;
    });
};

const REVIEW_TX_INCLUDES = ['reviews', 'reviews.author', 'reviews.subject'];
const IMAGE_VARIANTS = {
  'fields.image': [
    // Profile images
    'variants.square-small',
    'variants.square-small2x',

    // Listing images:
    'variants.landscape-crop',
    'variants.landscape-crop2x',
  ],
};

// If other party has already sent a review, we need to make transition to
// TRANSITION_REVIEW_2_BY_<CUSTOMER/PROVIDER>
const sendReviewAsSecond = (id, params, role, dispatch, sdk) => {
  const transition = getReview2Transition(role === CUSTOMER);

  const include = REVIEW_TX_INCLUDES;

  return sdk.transactions
    .transition({ id, transition, params }, { expand: true, include, ...IMAGE_VARIANTS })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(sendReviewSuccess());
      return response;
    })
    .catch(e => {
      dispatch(sendReviewError(storableError(e)));

      // Rethrow so the page can track whether the sending failed, and
      // keep the message in the form for a retry.
      throw e;
    });
};

// If other party has not yet sent a review, we need to make transition to
// TRANSITION_REVIEW_1_BY_<CUSTOMER/PROVIDER>
// However, the other party might have made the review after previous data synch point.
// So, error is likely to happen and then we must try another state transition
// by calling sendReviewAsSecond().
const sendReviewAsFirst = (id, params, role, dispatch, sdk) => {
  const transition = getReview1Transition(role === CUSTOMER);
  const include = REVIEW_TX_INCLUDES;

  return sdk.transactions
    .transition({ id, transition, params }, { expand: true, include, ...IMAGE_VARIANTS })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(sendReviewSuccess());
      return response;
    })
    .catch(e => {
      // If transaction transition is invalid, lets try another endpoint.
      if (isTransactionsTransitionInvalidTransition(e)) {
        return sendReviewAsSecond(id, params, role, dispatch, sdk);
      } else {
        dispatch(sendReviewError(storableError(e)));

        // Rethrow so the page can track whether the sending failed, and
        // keep the message in the form for a retry.
        throw e;
      }
    });
};

export const sendReview = (role, tx, reviewRating, reviewContent) => (dispatch, getState, sdk) => {
  const params = { reviewRating, reviewContent };

  const txStateOtherPartyFirst = txIsInFirstReviewBy(tx, role !== CUSTOMER);

  dispatch(sendReviewRequest());

  return txStateOtherPartyFirst
    ? sendReviewAsSecond(tx.id, params, role, dispatch, sdk)
    : sendReviewAsFirst(tx.id, params, role, dispatch, sdk);
};

const isNonEmpty = value => {
  return typeof value === 'object' || Array.isArray(value) ? !isEmpty(value) : !!value;
};

const timeSlotsRequest = params => (dispatch, getState, sdk) => {
  return sdk.timeslots.query(params).then(response => {
    return denormalisedResponseEntities(response);
  });
};

const fetchTimeSlots = listingId => (dispatch, getState, sdk) => {
  dispatch(fetchTimeSlotsRequest);

  // Time slots can be fetched for 90 days at a time,
  // for at most 180 days from now. If max number of bookable
  // day exceeds 90, a second request is made.

  const maxTimeSlots = 90;
  // booking range: today + bookable days -1
  const bookingRange = config.dayCountAvailableForBooking - 1;
  const timeSlotsRange = Math.min(bookingRange, maxTimeSlots);

  const start = moment
    .utc()
    .startOf('day')
    .toDate();
  const end = moment()
    .utc()
    .startOf('day')
    .add(timeSlotsRange, 'days')
    .toDate();
  const params = { listingId, start, end };

  return dispatch(timeSlotsRequest(params))
    .then(timeSlots => {
      const secondRequest = bookingRange > maxTimeSlots;

      if (secondRequest) {
        const secondRange = Math.min(maxTimeSlots, bookingRange - maxTimeSlots);
        const secondParams = {
          listingId,
          start: end,
          end: moment(end)
            .add(secondRange, 'days')
            .toDate(),
        };

        return dispatch(timeSlotsRequest(secondParams)).then(secondBatch => {
          const combined = timeSlots.concat(secondBatch);
          dispatch(fetchTimeSlotsSuccess(combined));
        });
      } else {
        dispatch(fetchTimeSlotsSuccess(timeSlots));
      }
    })
    .catch(e => {
      dispatch(fetchTimeSlotsError(storableError(e)));
    });
};

export const fetchNextTransitions = id => (dispatch, getState, sdk) => {
  dispatch(fetchTransitionsRequest());

  return sdk.processTransitions
    .query({ transactionId: id })
    .then(res => {
      dispatch(fetchTransitionsSuccess(res.data.data));
    })
    .catch(e => {
      dispatch(fetchTransitionsError(storableError(e)));
    });
};

// loadData is a collection of async calls that need to be made
// before page has all the info it needs to render itself
export const loadData = params => (dispatch, getState) => {
  const txId = new UUID(params.id);
  const state = getState().TransactionPage;
  const txRef = state.transactionRef;
  const txRole = params.transactionRole;

  // In case a transaction reference is found from a previous
  // data load -> clear the state. Otherwise keep the non-null
  // and non-empty values which may have been set from a previous page.
  const initialValues = txRef ? {} : pickBy(state, isNonEmpty);
  dispatch(setInitialValues(initialValues));

  // Sale / order (i.e. transaction entity in API)
  return Promise.all([
    dispatch(fetchTransaction(txId, txRole)),
    dispatch(fetchMessages(txId, 1)),
    dispatch(fetchNextTransitions(txId)),
  ]);
};
