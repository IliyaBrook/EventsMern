import React from 'react'

const spinner =
	(
		<div className="d-flex min-vh-100 justify-content-center align-items-center">
			<div className="preloader-wrapper big active">
				<div className="spinner-layer spinner-blue-only">
					<div className="circle-clipper left">
						<div className="circle"/>
					</div>
					<div className="gap-patch">
						<div className="circle"/>
					</div>
					<div className="circle-clipper right">
						<div className="circle"/>
					</div>
				</div>
			</div>
		</div>
	)
export default spinner