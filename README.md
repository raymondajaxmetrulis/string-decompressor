# string-decompressor

Decompresses strings of the format "num[str] . . . " with recursion

# Installation

Clone the repository

In Node CLI
<br/>`cd path/Decompressor`
<br/>`npm install`
<br/>`cd lib`
<br/>`node stringDecompressor.js compressedstring` 
<br/>compressedstring ex. 4[abc]5[a2[b]]ggg results in: abcabcabcabcabbabbabbabbabbggg
