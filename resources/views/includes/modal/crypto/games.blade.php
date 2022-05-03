<div class="crypto-game-insert-wrapper">
    <div class="crypto-game-insert">
        <div class="crypto-game-modal">
            <h2 class="modal-header">Add Record</h2>
            <span class="modal-close insert-close" data-section="insert">X</span>

            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" value="0" placeholder="ID" disabled/>
            <span class="modal-error modal-id-error"></span>

            <label class="modal-name-label" for="name">Name</label>
            <input id="name" class="modal-name" name="name" type="text" placeholder="Bitcoin" required/>
            <span class="modal-error modal-name-error"></span>

            <label class="modal-coin-label" for="coin">Coin</label>
            <input id="coin" class="modal-coin" name="coin" type="text" placeholder="BTC" required/>
            <span class="modal-error modal-coin-error"></span>

            <label class="modal-description-label" for="description">Description</label>
            <textarea id="description" class="modal-description" name="description" rows="3" cols="3" maxlength='250'></textarea>
            <span class="modal-error modal-description-error"></span>

            <label class="modal-chain-label" for="chain">Chain</label>
            <input id="chain" class="modal-chain" name="chain" type="text" placeholder="Core" required/>
            <span class="modal-error modal-chain-error"></span>

            <label class="modal-website-label" for="website">Website</label>
            <input id="website" class="modal-website" name="website" type="url" placeholder="trade.poseidon.local" required/>
            <span class="modal-error modal-website-error"></span>

            <button class="btn btn-danger modal-cancel insert-cancel" type="submit" data-section="insert">Cancel</button>
            <button class="btn btn-primary modal-submit insert-submit" type="submit" data-section="insert">Add</button>
        </div>
    </div>
</div>

<div class="crypto-game-update-wrapper">
    <div class="crypto-game-update">
        <div class="crypto-game-modal">
            <h2 class="modal-header">Update Record</h2>
            <span class="modal-close update-close" data-section="update">X</span>

            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" placeholder="ID" disabled/>
            <span class="modal-error modal-id-error"></span>

            <label class="modal-name-label" for="name">Name</label>
            <input id="name" class="modal-name" name="name" type="text" placeholder="Bitcoin" required/>
            <span class="modal-error modal-name-error"></span>

            <label class="modal-coin-label" for="coin">Coin</label>
            <input id="coin" class="modal-coin" name="coin" type="text" placeholder="BTC" required/>
            <span class="modal-error modal-coin-error"></span>

            <label class="modal-description-label" for="description">Description</label>
            <textarea id="description" class="modal-description" name="description" rows="3" cols="3" maxlength='250'></textarea>
            <span class="modal-error modal-description-error"></span>

            <label class="modal-chain-label" for="chain">Chain</label>
            <input id="chain" class="modal-chain" name="chain" type="text" placeholder="Core" required/>
            <span class="modal-error modal-chain-error"></span>

            <label class="modal-website-label" for="website">Website</label>
            <input id="website" class="modal-website" name="website" type="url" placeholder="trade.poseidon.local" required/>
            <span class="modal-error modal-website-error"></span>

            <button class="btn btn-danger modal-cancel update-cancel" type="submit" data-section="update">Cancel</button>
            <button class="btn btn-primary modal-submit update-submit" type="submit" data-section="update">Update</button>
        </div>
    </div>
</div>

<div class="crypto-game-destroy-wrapper">
    <div class="crypto-game-destroy">
        <div class="crypto-game-modal">
            <h2 class="modal-header">Destroy Record</h2>
            <span class="modal-close destroy-close" data-section="destroy">X</span>

            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" placeholder="ID" disabled/>
            <span class="modal-error modal-id-error"></span>

            <label class="modal-name-label" for="name">Name</label>
            <input id="name" class="modal-name" name="name" type="text" placeholder="Bitcoin" disabled/>
            <span class="modal-error modal-name-error"></span>

            <label class="modal-coin-label" for="coin">Coin</label>
            <input id="coin" class="modal-coin" name="coin" type="text" placeholder="BTC" disabled/>
            <span class="modal-error modal-coin-error"></span>

            <label class="modal-description-label" for="description">Description</label>
            <textarea id="description" class="modal-description" name="description" rows="3" cols="3" maxlength='250' disabled></textarea>
            <span class="modal-error modal-description-error"></span>

            <label class="modal-chain-label" for="chain">Chain</label>
            <input id="chain" class="modal-chain" name="chain" type="text" placeholder="Core" disabled/>
            <span class="modal-error modal-chain-error"></span>

            <label class="modal-website-label" for="website">Website</label>
            <input id="website" class="modal-website" name="website" type="url" placeholder="trade.poseidon.local" disabled/>
            <span class="modal-error modal-website-error"></span>

            <button class="btn btn-danger modal-cancel destroy-cancel" type="submit" data-section="destroy">Cancel</button>
            <button class="btn btn-primary modal-submit destroy-submit" type="submit" data-section="destroy">Destroy</button>
        </div>
    </div>
</div>
