const Button = ({ color, text }) => {
    return {
        type: 'button',
        props: {
            className: `btn-${color}`,
            children: {
                type: 'em',
                props: {
                    children: text
                }
            }
        }
    };
};

export default Button;