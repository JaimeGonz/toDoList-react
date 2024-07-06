import {describe, expect, test } from 'vitest';
import {renderHook, act} from '@testing-library/react';
import { useItems } from '../src/hooks/useItems';

describe('useItems hook', () => {
    test('should add and remove an item', () => {
        const { result } = renderHook(() => useItems());
        expect(result.current.items).toEqual([]);

        act(() => result.current.addItem('Item 1'));
        expect(result.current.items.length).toBe(1)

        act(() => result.current.deleteItem(result.current.items[0].id));
        expect(result.current.items).toEqual([]);
    })
})