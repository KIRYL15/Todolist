import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import '../App.css'

export type InputType = {
    addItem: (title: string) => void
}

export const Input = (props: InputType) => {
    let [title, setTitle] = useState('')
    let [textError, setTextError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setTextError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    }

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setTextError('Введите данные!')
        }
    }
    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onPressHandler}
                   className={textError ? "error" : ''}
            />
            <button onClick={addItem}>+</button>
            {/*кнопка для добавления тасок*/}
            {textError && <div className='errorMessage'>{textError}</div>}
        </div>
    );
};

















