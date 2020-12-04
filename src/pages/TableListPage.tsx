import React, { FC } from 'react';
import { v4 } from 'uuid';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router';
import { useLocalState } from '../logic/useLocalState';
import { TableData } from '../logic/tableData';
import { Div } from '../components/Div';

interface TableListPageProps {}

export const TableListPage: FC<TableListPageProps> = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const [tables, setTables] = useLocalState<TableData[]>('tables', []);

  const handleDelete = (table: string) => {
    const index = tables.findIndex((t) => t.table === table);
    if (index >= 0) {
      const copy = [...tables];
      copy.splice(index, 1);
      setTables(copy);
    }
  };

  return (
    <Div justify="flex-end" align="center" grows>
      <Div className={classes.root}>
        <List>
          {tables.map(({ table, user }) => (
            <ListItem
              key={table}
              button
              onClick={() => push(`/table/${table}`)}
            >
              <ListItemText primary={table} secondary={user} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleDelete(table)}
                  aria-label="Delete"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          onClick={() => push(`/table/${v4()}`)}
        >
          Create table
        </Button>
      </Div>
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    width: '100%',
    padding: theme.spacing(2),
  },
}));
