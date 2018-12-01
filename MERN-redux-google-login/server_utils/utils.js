// takes number of positive and negative votes and returns score
// https://gist.github.com/honza/5050540#file-main-js
const getVoteScore = (upvotes, downvotes) => {
  // when upvotes is zero this function returns either 0 or some weird 10^-18 negaative number
  // so instead just return negative of downvotes
  if (upvotes === 0) {
    return -downvotes;
  }

  const n = upvotes + downvotes;
  var z, phat;

  z = 1.96;
  phat = (1 * upvotes) / n;

  return (
    (phat +
      (z * z) / (2 * n) -
      z * Math.sqrt((phat * (1 - phat) + (z * z) / (4 * n)) / n)) /
    (1 + (z * z) / n)
  );
};

// assumes a and b both have an upVotes and downVotes field
const sortByVotesDescending = (a, b) => {
  return (
    getVoteScore(b.upVotes, b.downVotes) - getVoteScore(a.upVotes, a.downVotes)
  );
};

module.exports = {
  getVoteScore,
  sortByVotesDescending
};
