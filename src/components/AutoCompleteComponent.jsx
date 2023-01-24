import React from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

function AutoCompleteComponent() {
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
          title: 'The Lord of the Rings: The Return of the King',
          year: 2003,
        },
    ]

    const [value, setValue] = React.useState();

  return (
    <Autocomplete
        multiple
        id="fixed-tags-demo"
        value={value}
        onChange={(event, newValue) => {
        setValue([newValue]);
        }}
        options={top100Films}
        getOptionLabel={(option) => option.title}
        renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
            <Chip
            label={option.title}
            {...getTagProps({ index })}
            />
        ))
        }
        style={{ width: '100%' }}
        renderInput={(params) => (
        <TextField {...params} label="Search Friends" placeholder="Favorites" />
        )}
    />
  )
}

export default AutoCompleteComponent