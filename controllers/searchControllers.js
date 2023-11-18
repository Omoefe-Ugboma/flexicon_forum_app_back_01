// Import your models
const Post = require('../models/Post');
const User = require('../models/User');
const Community = require('../models/Community');

// Define the Search function
const Search = async (req, res) => {
  // Extract the 'query' parameter from the request
  const { query } = req.query;

  // Log the query to the console for debugging purposes
  console.log(query);

  // Create a case-insensitive regex for the query
  const regexQuery = new RegExp(query, 'i');

  try {
    // Search for posts with the case-insensitive regex
    const postResults = await Post.find({ $text: { $search: query, $caseSensitive: false } });

    // Search for communities with the case-insensitive regex
    const communitiesResults = await Community.find({ $text: { $search: query, $caseSensitive: false } });

    // Search for users with the case-insensitive regex
    const userResults = await User.find({ $text: { $search: query, $caseSensitive: false } });

    // Combine the results from different models into an object
    const allResults = {
      posts: postResults,
      communities: communitiesResults,
      users: userResults,
    };

    // Check if there are no matches in any of the models
    const noMatches = Object.values(allResults).every(resultArray => resultArray.length === 0);

    if (noMatches) {
      // Return a response if no matches are found
      return res.status(200).json({ message: 'No matches found for the given query' });
    }

    // Return the results if there are matches
    return res.status(200).json(allResults);
  } catch (error) {
    // Handle any errors that occur during the search
    res.status(500).json({ message: error.message });
  }
};

// Export the Search function
module.exports = { Search };
