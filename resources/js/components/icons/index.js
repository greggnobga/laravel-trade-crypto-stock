const Icon = (props) => {
    return (
        <span className="sprite">
            <svg className="icon">
                <use href={`/public/icons/sprite.svg#${props.id}`} />
            </svg>
        </span>
    );
}

export default Icon;