export const asyncCall = async <T>(func: () => Promise<T | undefined>): Promise<[T | undefined, Error | unknown]> => {
    try {
        const res = await func();
        return [res, undefined];
    } catch (err: unknown) {
        return [undefined, err];
    }
};

export const syncCall = <T>(func: () => T | undefined): [T | undefined, Error | unknown] => {
    try {
        const res = func();
        return [res, undefined];
    } catch (err: unknown) {
        return [undefined, err];
    }
};
