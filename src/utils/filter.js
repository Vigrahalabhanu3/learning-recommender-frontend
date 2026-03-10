/**
 * Checks if a string contains only ASCII characters.
 * @param {string} str 
 * @returns {boolean}
 */
export const isPureEnglish = (str) => {
    // Allows basic ASCII: letters, numbers, punctuation, spaces
    return /^[\x00-\x7F]*$/.test(str);
};

/**
 * Filters a list of courses to only include those with "pure English" titles and descriptions.
 * @param {Array} courses 
 * @returns {Array}
 */
export const filterEnglishCourses = (courses) => {
    if (!courses) return [];
    return courses.filter(course => {
        const titleOk = course.title ? isPureEnglish(course.title) : true;
        const descOk = course.description ? isPureEnglish(course.description) : true;
        return titleOk && descOk;
    });
};

/**
 * Normalizes confidence value to a string/number without double percentage.
 * @param {any} confidence 
 * @returns {string}
 */
export const normalizeConfidence = (confidence) => {
    if (typeof confidence === 'string') {
        return confidence.replace(/%+/g, '');
    }
    return confidence;
};
