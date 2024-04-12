import * as React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
// import { StaticRouter } from 'react-router-dom/server';
import Button from '@mui/material/Button';

const LinkBehavior = React.forwardRef((props, ref) => {
    const { href, ...other } = props;

    return <RouterLink ref={ref} to={href} {...other} />;
});

// function Router(props) {
//     const { children } = props;

//     if (typeof window === 'undefined') {
//         return <StaticRouter location="/">{children}</StaticRouter>;
//     }

//     return <MemoryRouter>{children}</MemoryRouter>;
// }

// Router.propTypes = {
//     children: PropTypes.node,
// };

export default function ButtonRouter({ text, href }) {
    return <Button component={RouterLink} to={href}>{ text }</Button>;
}
