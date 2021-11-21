import Autocomplete from './Autocomplete';
import usStates from './us-states';
import './main.css';


// US States
const data = usStates.map(state => ({
  text: state.name,
  value: state.abbreviation
}));
new Autocomplete(document.getElementById('state'), {
  data,
  onSelect: (stateCode) => {
    console.log('selected state:', stateCode);
  },
});

const githubUrl = {
  url: 'https://api.github.com/search/users',
  queryParameterKey: 'q',
  perPageParameterKey: 'per_page'
}
// Github Users
new Autocomplete(document.getElementById('gh-user'), {
  url: githubUrl,
  onSelect: (ghUserId) => {
    console.log('selected github user id:', ghUserId);
  },
});
