import {useCallback, useEffect} from 'react';
import {usePlaidLink} from 'react-plaid-link';
import {plaidLinkPropTypes, plaidLinkDefaultProps} from './plaidLinkPropTypes';

const PlaidLink = (props) => {
    const onSuccess = useCallback((publicToken, metadata) => {
        props.onSuccess({publicToken, metadata});
    }, []);

    const {open, ready, error} = usePlaidLink({
        token: props.token,
        onSuccess,
        onExit: (exitError, metadata) => {
            console.debug('[PlaidLink] Exit: ', {exitError, metadata});
            props.onExit();
        },
        onEvent: (event, metadata) => {
            console.debug('[PlaidLink] Event: ', {event, metadata});
        },
    });

    useEffect(() => {
        if (error) {
            props.onError(error);
            return;
        }

        if (!ready) {
            return;
        }

        open();
    }, [ready, error]);

    return null;
};

PlaidLink.propTypes = plaidLinkPropTypes;
PlaidLink.defaultProps = plaidLinkDefaultProps;
PlaidLink.displayName = 'PlaidLink';
export default PlaidLink;
