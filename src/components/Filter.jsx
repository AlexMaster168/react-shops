import React from 'react';
import {Input, Menu} from 'semantic-ui-react';
import {Select, MenuItem} from "@material-ui/core";

const Filter = ({ setFilter, filterBy, searchQuery, setSearchQuery }) => (
    <Menu secondary>
        <MenuItem
            active={filterBy === 'all'}
            onClick={setFilter.bind(this, 'all')}>
            Все
        </MenuItem>
        <Select>
        <MenuItem
            active={filterBy === 'population_high'}
            onClick={setFilter.bind(this, 'population_high')}>
            Популярность (Высокая)
        </MenuItem>
        <MenuItem
            active={filterBy === 'population_low'}
            onClick={setFilter.bind(this, 'population_low')}>
            Популярность (Низкая)
        </MenuItem>
        <MenuItem
            active={filterBy === 'price_high'}
            onClick={setFilter.bind(this, 'price_high')}>
            Цена (дорогие)
        </MenuItem>
        <MenuItem
            active={filterBy === 'price_low'}
            onClick={setFilter.bind(this, 'price_low')}>
            Цена (дешевые)
        </MenuItem>
        <MenuItem
            active={filterBy === 'author'}
            onClick={setFilter.bind(this, 'author')}>
            Автор
        </MenuItem>
        </Select>
        <Menu.Item>
            <Input
                icon="search"
                onChange={e => setSearchQuery(e.target.value)}
                value={searchQuery}
                placeholder="Введите запрос..."
            />
        </Menu.Item>
    </Menu>
);

export default Filter;
