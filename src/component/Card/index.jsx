import style from "./Card.module.sass"

function Card(props) {
    return (
        <div className={style.card}>
            <h3 className={style.h3}>{props.header}</h3>
            <p className={style.p}>{props.text}</p>
        </div>
    )
}

export default Card