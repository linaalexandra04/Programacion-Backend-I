class UserDTO {
    constructor(user) {
        this.id = user._id || user.id;
        this.firstName = user.first_name;
        this.lastName = user.last_name;
        this.email = user.email;
        this.role = user.role || 'user'; 
    }

    toResponse() {
        return {
            id: this.id,
            name: `${this.firstName} ${this.lastName}`,
            email: this.email,
            role: this.role,
        };
    }
}

export default UserDTO;