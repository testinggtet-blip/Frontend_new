// Import block categories
import { basicBlocks } from './blocks/basicBlocks';
import { formBlocks } from './blocks/formBlocks';
import { layoutBlocks } from './blocks/layoutBlocks';
import { mediaBlocks } from './blocks/mediaBlocks';
import { advancedBlocks } from './blocks/advancedBlocks';

export default function CustomBlocks(editor) {
    const Blocks = editor.BlockManager;
    
    // Combine all blocks
    const allBlocks = [
        ...basicBlocks,
        ...formBlocks,
        ...layoutBlocks,
        ...mediaBlocks,
        ...advancedBlocks
    ];
    
    // Register all blocks
    allBlocks.forEach(block => {
        const { id, ...config } = block;
        Blocks.add(id, config);
    });
}