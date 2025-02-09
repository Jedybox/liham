import {  createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Block {
    id: string | number;
    username: string;
}

interface BlocksState {
    blocks: Block[];
}

const initialState: BlocksState = {
    blocks: [],
};

const blocksSlice = createSlice({
    name: 'blocks',
    initialState,
    reducers: {
        addBlock(state, action: PayloadAction<Block>) {
            state.blocks.push(action.payload);
        },
        removeBlock(state, action: PayloadAction<string | number>) {
            state.blocks = state.blocks.filter(
                (block) => block.id !== action.payload
            );
        },
    },
});

export const { addBlock, removeBlock } = blocksSlice.actions;
export default blocksSlice.reducer;