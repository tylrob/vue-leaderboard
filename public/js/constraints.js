var constraints = {
	email: {
    	presence: {
    		message: "Email can't be blank"
    	},
    	email: {
    		message: "This doesn't look like a valid email"
    	}
	},
	athlete: {
		presence: {
			message: "You need to enter a name"
		},
		length: {
			maximum: 40,
			tooLong: "Your name is too long. It needs to be less than 40 characters"
		}
	},
	eventPrice: {
		presence: {
			message: "Your event needs a price"
		},
		numericality: {
			notValid: "Use numbers only in your price",
			greaterThanOrEqualTo: 10,
			notGreaterThanOrEqualTo: "Your price must be a minimum of $10"
		}
	}
}