class CheckConflicts {
    static validateUserDetail(req, res, next) {
        // const { password } = req.body;
        const password = req.body.password;
        if(password.length < 8) {
            res.status(400).json({
                status: 'error',
                message: 'passowrd lenght less than 8'
            })
        }
        next();
    }
}

export default CheckConflicts;