// Get Quotes From API
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const newQuoteBtn = document.getElementById('new-quote')
const twitterUrlbtn = document.getElementById('twitter')
const loader = document.getElementById('loader')


// Show Loading
function loading(){
  loader.hidden = false
  quoteContainer.hidden=true
}

// Hide Loading
function complete(){
  quoteContainer.hidden = false
  loader.hidden= true
}
let apiQuotes = []
// Show New Quote
function newQuote(){
  loading()
  // Pick a Random quote from apiQuotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

  // check author field is blank
  if(!quote.author){
    authorText.textContent= "Unknown"
  }else{
    authorText.textContent= quote.author
  }
  // check quote length
  if(quote.text.length >120){
    quoteText.classList.add('long-quote')
  }else{
 quoteText.classList.remove('long-quote')
  }
  quoteText.textContent=quote.text
  complete()
}
async function getQuotes(){
  loading()
  const apiUrl='https://jacintodesign.github.io/quotes-api/data/quotes.json'
  try{
 const response= await fetch(apiUrl)
 apiQuotes= await response.json()
newQuote()
  }catch (error){

    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote(){
  const twitterUrl= `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')
}

//Event Listners
newQuoteBtn.addEventListener('click',newQuote)
twitterUrlbtn.addEventListener('click',tweetQuote)


// On Load
getQuotes()