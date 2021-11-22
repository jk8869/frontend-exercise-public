import Autocomplete from './Autocomplete';
import usStates from './us-states';
import './main.css';
import Api from './Api';


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

// Github Api
new Autocomplete(document.getElementById('gh-user'), {
  api: Api.github,
  onSelect: (ghUserId) => {
    console.log('selected github user id:', ghUserId);
  },
});

// Gorest Api
new Autocomplete(document.getElementById('gorest-user'), {
  api: Api.gorest,
  onSelect: (gorestUserId) => {
    console.log('selected gorest user id:', gorestUserId);
  },
});
