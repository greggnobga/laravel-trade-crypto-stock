const Icon = (props) => {
    return (
        <div id="sprite">
            <svg className="icon">
                <use href={`/public/icons/sprite.svg#${props.id}`} />
            </svg>
        </div>
    );
}

export default Icon;