const Icon = ({ id }) => {
    return (
        <svg className="w-6 h-6 inline fill-current">
            <use href={`/public/icons/sprite.svg#${id}`} />
        </svg>
    );
};

export default Icon;
