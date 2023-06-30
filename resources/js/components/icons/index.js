const Icon = ({ id, width, height }) => {
    return (
        <svg
            className={`${width ? width : "w-6"} ${
                height ? height : "h-6"
            } inline fill-current`}
        >
            <use href={`/public/icons/sprite.svg#${id}`} />
        </svg>
    );
};

export default Icon;
