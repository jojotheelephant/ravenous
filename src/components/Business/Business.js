import React from 'react';
import './Business.css';

class Business extends React.Component {
	render() {
		const business = this.props.business;
		const googleLink = `https://www.google.com/maps/search/?api=1&query=${business.name}${business.city}`;
		return (
			<div className="Business">
				<div className="image-container">
					<a href={business.url}>
						<img src={business.imageSrc} alt="" />
					</a>
				</div>
				<h2>
					<a href={googleLink}>{business.name}</a>
				</h2>
				<div className="Business-information">
					<div className="Business-address">
						<p>{business.address}</p>
						<p>{business.city}</p>
						<p>
							{business.state} {business.zipCode}
						</p>
					</div>
					<div className="Business-reviews">
						<h3>{business.category}</h3>
						<h3 className="rating">{business.rating}</h3>
						<p>{business.reviewCount} reviews</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Business;
