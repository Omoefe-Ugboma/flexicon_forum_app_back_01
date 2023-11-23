// Import your models
const Post = require('../models/Post');
const User = require('../models/User');
const Community = require('../models/Community');

// Define the Search function
const Search = async (req, res) => {
  // Extract the 'query' parameter from the request
  const{ query,limit} = req.query;
  const trimquery = query.replace(/\s/g, '');
  console.log(trimquery);
    // Use a default limit if not provided
    const resultLimit = limit ? parseInt(limit) : 10;
    //handle empty requests
  if (!trimquery) {
    return res.status(400).json({message: 'A search term is required'})
  }

  try {
    // Search for posts with the case-insensitive regex
    const postResults = await Post.find({ $text: { $search: trimquery, $caseSensitive: false } }).limit(resultLimit)

    // Search for communities with the case-insensitive regex
    const communitiesResults = await Community.find({ $text: { $search: trimquery, $caseSensitive: false } }).limit(resultLimit)

    // Search for users with the case-insensitive regex
    const userResults = await User.find({ $text: { $search: trimquery, $caseSensitive: false } }).limit(resultLimit)

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
      return res.status(404).json({ message: 'No matches found for the given query' });
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
