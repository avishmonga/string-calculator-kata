const add = (numbers) => {
  if (numbers === '') return 0;

  let delimiters = [',']; // Default delimiter

  let numberString = numbers; // Original numbers string

  // Check for custom delimiter syntax at the beginning
  const customDelimiterMatch = numbers.match(/^\/\/\[(.+)]\n/);
  if (customDelimiterMatch) {
    const delimiterSection = customDelimiterMatch[1]; // Extract the delimiters inside the brackets
    delimiters = delimiterSection.split(']['); // Split by "]["
    numberString = numbers.slice(customDelimiterMatch[0].length); // Get the rest of the numbers
  } else if (numbers.startsWith('//')) {
    // Support single-character custom delimiters
    delimiters = [numbers[2]];
    numberString = numbers.slice(4);
  }

  // Escape special characters
  const escapedDelimiters = delimiters.map((delim) =>
    delim.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&')
  );

  const normalizedNumbers = numberString.replace(/\n/g, ','); // Replace newlines with delimiter

  // Create a dynamic regular expression for splitting
  const delimiterRegex = new RegExp(escapedDelimiters.join('|'), 'g');
  const nums = normalizedNumbers
    .split(delimiterRegex)
    .map((num) => parseInt(num, 10)); // Convert to integers
  // Check for negatives
  const negatives = nums.filter((num) => num < 0);

  if (negatives.length > 0) {
    throw new Error(`negative numbers not allowed: ${negatives.join(', ')}`);
  }

  const filteredNums = nums.filter((num) => num <= 1000); // Ignore numbers greater than 1000

  return filteredNums.reduce((sum, num) => sum + num, 0); // Add all numbers
};

module.exports = add;
