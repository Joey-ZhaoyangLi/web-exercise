const apiKey = 'EO5Jg2GJy6dGWX7I3wNr-qJLZJ47s178ZFuJ6P5vmOOJKatpo0pIIZOwGmwcWU7cr6_DxCzvVlas_XAQuFbEd3VktzhXw8WRkvTu2Py_debrWiUJZN5nwWO7h1l-W3Yx'

const Yelp = {
  search(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        }
    }).then(response => {
      console.log(response)
      if(response.ok){
        return response.json()
      } else{
        throw new Error('Request failed')
      }
    })
    .then(jsonResponse => {
      if (jsonResponse.businesses){
        return jsonResponse.businesses.map(business => {
          return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            city: business.location.city,
            address: business.location.address1,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count,
            url: business.url,
          }
        })
      }
    })
    .catch(error=> {
      console.log(error)
    })
  }
}

export default Yelp