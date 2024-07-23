type IconProps = {
    id: string;
    width: string;
    height: string;
};

const Icon = (props: IconProps) => {
    return (
        <svg
            className={`${props.width ? props.width : 'w-6'} ${
                props.height ? props.height : 'h-6'
            } inline fill-current`}>
            <use href={`/public/icons/sprite.svg#${props.id}`} />
        </svg>
    );
};

export default Icon;
