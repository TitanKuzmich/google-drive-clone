import config from "lib/config"

export const getFileName = (name) => {
    const format = `.${name.split(".").pop()}`
    if (name.length > config.maxNameLength + format.length) {
        return `${name.slice(0, config.maxNameLength / 2)}...${name.slice((config.maxNameLength / 2) + 1, config.maxNameLength)}${format}`
    }

    return name
}