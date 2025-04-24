import PropTypes from 'prop-types';

function ApplyWrapper({ when, wrapper, children }) {
    return when ? wrapper(children) : <>{children}</>;
}

ApplyWrapper.propTypes = {
    when: PropTypes.bool,
    wrapper: PropTypes.func,
    children: PropTypes.node,
}

export { ApplyWrapper }
