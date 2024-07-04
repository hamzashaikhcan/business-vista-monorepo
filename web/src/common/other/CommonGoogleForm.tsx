import React, { useEffect, useState } from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';
import Img from '../../assets/img/scene2.png';

const CommonGoogleForm = () => {
	const [googleForm, setGoogleForm] = useState<boolean>(false);
	useEffect(() => {
		const timeout = setTimeout(() => {
			setGoogleForm(true);
		}, 3000);
		return () => {
			clearTimeout(timeout);
		};
	}, []);
	return (
		<Modal
			setIsOpen={setGoogleForm}
			isOpen={googleForm}
			size='xl'
			isScrollable
			isCentered
			titleId='googleForm'>
			<ModalHeader setIsOpen={setGoogleForm} className='px-5 mt-3'>
				<ModalTitle id='googleForm'>If you want to comment</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<div className='row'>
					<div className='col-auto'>
						<iframe
							title='form'
							src='https://docs.google.com/forms/d/e/1FAIpQLSf4JIKsmzm-KGfAw8IKUDIISW5ZsyqsShDhTD5cJtpfNH84pg/viewform?embedded=true'
							width='640'
							height='720'
							frameBorder='0'>
							Loading...
						</iframe>
					</div>
					<div className='col d-flex align-items-center'>
						<img src={Img} className='img-fluid' alt='' />
					</div>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default CommonGoogleForm;
