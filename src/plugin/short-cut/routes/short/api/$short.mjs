import {SxgToDate} from 'newbase60'
export async function get(req) {
  const {short} = req.pathParameters
  const parsed = parseShort(short)
  const {year,dayOfMonth,month} = extractDateParts(SxgToDate(parsed.sxgDate))
  const types = {b:'blog',n:'note',c:'comment'}
  const location =  `/${year}/${month}/${dayOfMonth}/${types[parsed.type]}/${parsed.ordinal}`

  return {
    status:302,
    location
  }
}

function extractDateParts(date) {
  if (!(date instanceof Date)) {
    throw new Error('Invalid date object');
  }

  let year = date.getFullYear();
  let dayOfMonth = date.getDate();
  // JavaScript's getMonth() function returns a 0-based month number, so we add 1 to get the human-readable month number
  let month = date.getMonth() + 1;

  return {
    year,
    dayOfMonth,
    month
  };
}

function parseShort(str) {
  console.log({str})
  if (str.length < 5) {
    throw new Error('Invalid string format');
  }

  let type = str.charAt(0);
  let sxgDate = str.substring(1, 4);
  let ordinal = parseInt(str.substring(4));

  if (isNaN(ordinal)) {
    throw new Error('Invalid number format');
  }

  return {
    type,
    sxgDate,
    ordinal
  };
}


const shortWords = [
  'act', 'add', 'age', 'aim', 'air', 'all', 'arm', 'art', 'ask', 'bag', 
  'bar', 'bed', 'big', 'bit', 'box', 'boy', 'bus', 'buy', 'can', 'car', 
  'cat', 'cut', 'dad', 'day', 'dog', 'dry', 'due', 'ear', 'eat', 'end', 
  'eye', 'far', 'fat', 'few', 'fit', 'fix', 'fly', 'for', 'fun', 'gap', 
  'gas', 'get', 'guy', 'hat', 'her', 'him', 'hit', 'hot', 'how', 'ice', 
  'ill', 'ink', 'jar', 'jet', 'job', 'key', 'kid', 'kin', 'kit', 'leg', 
  'let', 'lie', 'lip', 'log', 'lot', 'low', 'mad', 'man', 'map', 'mat', 
  'may', 'mom', 'mud', 'net', 'new', 'not', 'now', 'nut', 'oak', 'old', 
  'one', 'out', 'pan', 'pen', 'pet', 'pie', 'pin', 'pit', 'pot', 'put', 
  'ran', 'rat', 'red', 'rip', 'row', 'rub', 'run', 'sad', 'saw', 'sea', 
  'see', 'set', 'she', 'sit', 'sky', 'son', 'sun', 'tab', 'tea', 'tie', 
  'tin', 'tip', 'top', 'toy', 'try', 'two', 'use', 'van', 'vet', 'war', 
  'was', 'way', 'web', 'wet', 'who', 'why', 'win', 'yes', 'yet', 'you', 
  'zip', 'ant', 'bee', 'cow', 'cub', 'dog', 'egg', 'fun', 'hen', 'ink', 
  'jam', 'kid', 'lap', 'men', 'nip', 'owl', 'pig', 'rug', 'sip', 'tin', 
  'urn', 'vow', 'wax', 'yip', 'zap', 'bay', 'cay', 'day', 'ebb', 'hay', 
  'icy', 'joy', 'key', 'lay', 'may', 'nay', 'oaf', 'pay', 'ray', 'say', 
  'toy', 'way', 'boy', 'coy', 'dry', 'guy', 'joy', 'soy', 'toy', 'wry', 
  'gym', 'shy', 'sky', 'sly', 'spy', 'try', 'why', 'pry', 'fry', 'cry', 
  'ply', 'bye'
]
