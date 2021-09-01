const dummy = (blogs) => {
  return(1)
   
}
const totLikes = (blogs) => {

  const tot = [];

  var blogsLength = blogs.length;

  for (var i =0; i < blogsLength; i++){
    tot.push(blogs[i].likes)
  }
  const totN = tot.reduce((a, b) => a + b, 0)
  console.log(totN)
  return(totN)
   
}

const mostLikes = (blogs) => {
  const tot = [];

  var blogsLength = blogs.length;

  for (var i =0; i < blogsLength; i++){
    tot.push(blogs[i].likes)
  }
  const max = tot.reduce(function(a, b) { return Math. max(a, b); }, 0);
  console.log(max)

  var yo;
  for (var i =0; i < blogsLength; i++) {
    if (max === blogs[i].likes){
      
      yo = blogs[i]
    }
  }
  console.log(yo)
  return(yo)
}


const mostBlogs = (blogs) => {
  var most;
  const arr =[];

  for  (var i = 0; i < blogs.length; i++){
    arr.push(blogs[i].blogs)
  }
  const max = arr.reduce(function(a, b) { return Math. max(a, b); }, 0);

  for (var i =0; i < blogs.length; i++) {
    if (max === blogs[i].blogs){
      most = blogs[i].author
    }
  }
  console.log(most)
  return(most)
}

const mostTotLikes = (blogs) => {
  let authorLikes = blogs.reduce((op, {author, likes}) => {
    op[author] = op[author] || 0
    op[author] += likes
    return op
  },{})
  
  // to find most likes
  let mostLikes = Object.keys(authorLikes).sort((a,b)=> authorLikes[b] - authorLikes[a])[0]

  console.log(mostLikes, authorLikes[mostLikes])
  return(authorLikes[mostLikes])
}


module.exports = {
  dummy,
  totLikes,
  mostLikes,
  mostBlogs,
  mostTotLikes
}
