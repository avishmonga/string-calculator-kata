const add = (numbers) => {
  if (numbers === '') return 0;

  let delimiter = ','; // Default delimiter

  let numberString = numbers; // Original numbers string

  // Check for custom delimiter syntax at the beginning
  const customDelimiterMatch = numbers.match(/^\/\/\[(.+)]\n/);
  if (customDelimiterMatch) {
    delimiter = customDelimiterMatch[1]; // Extract the delimiter inside [ ]
    numberString = numbers.slice(customDelimiterMatch[0].length); // Get the rest of the numbers
  } else if (numbers.startsWith('//')) {
    // Support single-character custom delimiters
    delimiter = numbers[2];
    numberString = numbers.slice(4);
  }

  // Escape special characters
  const escapedDelimiter = delimiter.replace(
    /[.*+?^=!:${}()|\[\]\/\\]/g,
    '\\$&'
  );

  const normalizedNumbers = numberString.replace(/\n/g, escapedDelimiter); // Replace newlines with delimiter

  // Create a dynamic regular expression for splitting
  const delimiterRegex = new RegExp(escapedDelimiter, 'g');

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
