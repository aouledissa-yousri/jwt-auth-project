

class RandomHelper {

    static genRandomInt(min, max) {
        return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min
    }
}

module.exports = RandomHelper