<div class="crypto-moon-insert">
    <div class="crypto-modal">
        <div class="modal-group">
            <h2 class="modal-header">Add Record</h2>
            <span class="modal-buffer"></span>
            <span class="modal-close">X</span>
        </div>

        <div class="modal-group">
            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" value="0" placeholder="ID" disabled/>
            <span class="modal-error modal-id-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-name-label" for="name">Name</label>
            <input id="name" class="modal-name" name="name" type="text" placeholder="Bitcoin" required/>
            <span class="modal-error modal-name-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-coin-label" for="coin">Coin</label>
            <input id="coin" class="modal-coin" name="coin" type="text" placeholder="BTC" required/>
            <span class="modal-error modal-coin-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-description-label" for="description">Description</label>
            <textarea id="description" class="modal-description" name="description" rows="3" cols="3" maxlength='250'></textarea>
            <span class="modal-error modal-description-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-zone-label" for="zone">Zone</label>
            <input id="zone" class="modal-zone" name="zone" type="text" placeholder="Core" required/>
            <span class="modal-error modal-zone-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-website-label" for="website">Website</label>
            <input id="website" class="modal-website" name="website" type="text" placeholder="trade.poseidon.local" required/>
            <span class="modal-error modal-website-error"></span>
        </div>

        <div class="modal-group">
            <div class="modal-label"></div>
            <div class="modal-button">
                <div class="button-dismiss">
                    <button class="btn btn-danger modal-cancel" type="submit">Cancel</button>
                </div>
                <div class="button-submit">
                    <button class="btn btn-primary modal-insert" type="submit">Add</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="crypto-moon-update">
    <div class="crypto-modal">
        <div class="modal-group">
            <h2 class="modal-header">Update Record</h2>
            <span class="modal-buffer"></span>
            <span class="modal-close">X</span>
        </div>
        <div class="modal-group">
            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" placeholder="ID" disabled/>
            <span class="modal-error modal-id-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-name-label" for="name">Name</label>
            <input id="name" class="modal-name" name="name" type="text" placeholder="Bitcoin" required/>
            <span class="modal-error modal-name-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-coin-label" for="coin">Coin</label>
            <input id="coin" class="modal-coin" name="coin" type="text" placeholder="BTC" required/>
            <span class="modal-error modal-coin-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-description-label" for="description">Description</label>
            <textarea id="description" class="modal-description" name="description" rows="3" cols="3" maxlength='250'></textarea>
            <span class="modal-error modal-description-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-zone-label" for="zone">Zone</label>
            <input id="zone" class="modal-zone" name="zone" type="text" placeholder="Core" required/>
            <span class="modal-error modal-zone-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-website-label" for="website">Website</label>
            <input id="website" class="modal-website" name="website" type="text" placeholder="trade.poseidon.local" required/>
            <span class="modal-error modal-website-error"></span>
        </div>

        <div class="modal-group">
            <div class="modal-label"></div>
            <div class="modal-button">
                <div class="button-dismiss">
                    <button class="btn btn-danger modal-cancel" type="submit">Cancel</button>
                </div>
                <div class="button-submit">
                    <button class="btn btn-primary modal-update" type="submit" data-section="update">Update</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="crypto-moon-destroy">
    <div class="crypto-modal">
        <div class="modal-group">
            <h2 class="modal-header">Destroy Record</h2>
            <span class="modal-buffer"></span>
            <span class="modal-close">X</span>
        </div>
        <div class="modal-group">
            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" placeholder="ID" disabled/>
            <span class="modal-error modal-id-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-name-label" for="name">Name</label>
            <input id="name" class="modal-name" name="name" type="text" placeholder="Bitcoin" disabled/>
            <span class="modal-error modal-name-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-coin-label" for="coin">Coin</label>
            <input id="coin" class="modal-coin" name="coin" type="text" placeholder="BTC" disabled/>
            <span class="modal-error modal-coin-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-description-label" for="description">Description</label>
            <textarea id="description" class="modal-description" name="description" rows="3" cols="3" maxlength='250' disabled></textarea>
            <span class="modal-error modal-description-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-zone-label" for="zone">Zone</label>
            <input id="zone" class="modal-zone" name="zone" type="text" placeholder="Core" disabled/>
            <span class="modal-error modal-zone-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-website-label" for="website">Website</label>
            <input id="website" class="modal-website" name="website" type="text" placeholder="trade.poseidon.local" disabled/>
            <span class="modal-error modal-website-error"></span>
        </div>
        <div class="modal-group">
            <div class="modal-label"></div>
            <div class="modal-button">
                <div class="button-dismiss">
                    <button class="btn btn-danger modal-cancel" type="submit">Cancel</button>
                </div>
                <div class="button-submit">
                    <button class="btn btn-primary modal-destroy" type="submit" data-section="destroy">Destroy</button>
                </div>
            </div>
        </div>
    </div>
</div>
