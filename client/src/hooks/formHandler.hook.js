import React, {useState} from 'react'

const useFormHandler = ({...args}) => {
	const [input, setInput] = useState({...args})
	const inputHandler = (event) => {
		setInput({
			...input, [event.target.name]: event.target.value
		})
	}
	return {input, inputHandler}
}

export default useFormHandler