class AuthController {

    constructor(authService) {
        this.authService = authService;
    }

    async register(req, res, next) {
        try {
            const newUser = await this.authService.register(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const data = await this.authService.login(email, password);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const tokens = await this.authService.refreshToken(refreshToken);
            res.status(200).json(tokens);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            await this.authService.logout(req.user.id);
            res.status(200).json({ message: "Logged out successfully" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;
