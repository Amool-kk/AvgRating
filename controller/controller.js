const userDb = require('../database/model');
const bcrypt = require('bcrypt');
const movies = require('../database/moviesmodel');

const getMovieData = async () => {
    const results = await movies.find();
    return results
}

exports.add = async (req, res) => {
    const { moviesName, rating } = req.body;

    if (!moviesName || !rating) {
        res.status(400).send({ message: "All details are required!" });
    }

    try {
        const favMovie = new movies({
            id: req.user.email,
            moviesName,
            rating
        })

        const results = await favMovie.save();

        res.status(200).send({ message: "Your movie is added!" })

    } catch (error) {
        res.status(400).send({ message: error.message || "Some error occured please try again!" })
    }
}

exports.search = async (req, res) => {
    const { moviesName } = req.body;

    if (!moviesName) {
        res.status(400).send({ message: "It require movie name!" });
    }

    try {
        const movieArray = [];
        let avgRating = 0;
        let name;
        const data = await getMovieData();
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.moviesName.toLowerCase().indexOf(moviesName.toLowerCase()) > -1) {
                movieArray.push(element)
                avgRating += parseFloat(element.rating)
                name = element.moviesName;
            }
        }
        res.status(200).send({ message: `avgRating of ${name} is ${avgRating / movieArray.length}` })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}


exports.register = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Request can not be empty!" })
    }
    const user = new userDb({
        email: req.body.email,
        password: req.body.password
    })

    user.save(user).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occured please try again!" })
    })
}

let count = 0;
let loginTry = true;
let lefttime = 1800;


exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({ message: "Request can not be empty!" })
    }
    if (count > 3) {
        if (loginTry) {
            loginTry = false;
            const timer = setInterval(() => {
                lefttime--;
                if (lefttime == 0) {
                    count = 0;
                    lefttime = 1800;
                    loginTry = true;
                    clearInterval(timer)
                }
            }, 1000);
        }
        res.status(200).send({ message: `Your account is locked!!. Wait for ${Math.floor(lefttime / 60)} min left` })
    } else {
        const userExist = await userDb.findOne({ email: email })

        if (userExist) {
            const isMatch = await bcrypt.compare(password, userExist.password)
            if (isMatch) {
                const token = await userExist.genrateToken();
                res.cookie('jwt', token, {
                    httpOnly: true
                })
                const results = await userExist.save()
                res.status(200).send({ message: "Login Successfuly" });
            } else {
                res.status(400).send({ message: "User details is not correct!" });
                count++;
            }
        } else {
            count++;
            res.status(400).send({ message: "User not found!" });
        }
    }


}

exports.logout = (req, res) => {
    res.clearCookie('jwt')
    res.status(200).send('user logout')
}