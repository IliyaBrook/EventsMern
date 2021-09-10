import React from 'react'
import styled from "styled-components"
import './bootstrap.scss'
import Draggable from "react-draggable"
import {useDispatch} from 'react-redux'
import {Flex} from "./flex"

//example
//JSX
// <Button variant="primary" onClick={() => reducer({type:CHAT_WINDOW_OPEN})}>
// 	Launch modal with grid
// </Button>
//
// <ModalComponent
// 	// props={{show: showModal, setShowModal}}
// 	width="50%"
// 	height='300px'
// 	display={display}
// 	close={CHAT_WINDOW_CLOSE}
// />
//   trigger
// const reducer = useDispatch()
// const display = useSelector(state => state.socialReducer.chatWindowOpen)


const ModalComponentStyled = styled.div`
  padding: 2px;
  position: absolute;
  z-index: 50;
  border-radius: 5px;
  display: ${(props) => props.display || 'none'};
  width: ${({width}) => width || '100%'};
  background-color: ${(props) => props.bgColor || 'black'};
  height: ${({height}) => height || '300px'};
  .modal-content-wrapper {
    height: 100%;
    width: 100%;
    background-color: white;
  }
  .top-border {
    height: 10%;
    background-color: #37474f;
    cursor: move;
    i{
      cursor: pointer;
    }
  }
`
export const ModalComponent = (props) => {
	const dispatch = useDispatch()
	return (
		<div>
			<Draggable defaultClassNameDragged="top-border"
			           handle=".handle"
			>
				<ModalComponentStyled {...props} >
					<div className="modal-content-wrapper">
						<div className="top-border handle">
							<Flex justify="flex-end">
								<i className="small material-icons" onClick={() => dispatch({type:props.close})}>close</i>
							</Flex>
						</div>
					</div>
				</ModalComponentStyled>
			</Draggable>
		</div>
	)
}
