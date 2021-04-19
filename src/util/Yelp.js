const apiKey =
    "Mu0hh-1a4vC7VhodH8jmQ0r5fdnIjR1ADm72FI_hVKv9QoYGvFw_O35xHPX54bSAv7hlu70I4H7r98H69ba2-J7nhJDhnSCKjRe3udeHNEO88Carh4xn5ObfEKF9YHYx";

const Yelp = {
    search(term, location, sortBy) {
        return fetch(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                if (jsonResponse.businesses) {
                    return jsonResponse.businesses.map((business) => {
                        return {
                            id: business.id,
                            imageSrc: business.image_url,
                            name: business.name,
                            address: business.location.address1,
                            city: business.location.city,
                            state: business.location.state,
                            zipCode: business.location.zip_code,
                            category: business.categories.title,
                            rating: business.rating,
                            reviewCount: business.review_count,
                            url: business.url,
                        };
                    });
                }
            });
    },
};

export default Yelp;
