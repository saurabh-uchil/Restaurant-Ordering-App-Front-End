export const rules = {
        ownerName: {required: "Owner name is required"},
        restaurantName: {required: "Restaurant name is required"},
        email:{
            required: "Email is required",
            pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email",
                    },
        },
        password:{
                required: "Password is required",
                minLength:{
                                value: 8,
                                message: "Password must be at least 8 characters",
                            },
                }
    }