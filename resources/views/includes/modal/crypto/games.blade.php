<div class="crypto-game-wrapper">
    <div class="crypto-modal">
        <div class="modal-group">
            <h2 class="modal-header"></h2>
            <span class="modal-dismiss" data-action="dismiss">X</span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" value="0" placeholder="ID" disabled/>
            <span class="modal-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="name">Name</label>
            <input id="name" class="modal-name" name="name" type="text" placeholder="Bitcoin" required/>
            <span class="modal-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="coin">Coin</label>
            <input id="coin" class="modal-coin" name="coin" type="text" placeholder="BTC" required/>
            <span class="modal-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="description">Description</label>
            <textarea id="description" class="modal-description" name="description" rows="3" cols="3" maxlength='250'></textarea>
            <span class="modal-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="chain">Chain</label>
            <input id="chain" class="modal-chain" name="chain" type="text" placeholder="Core" required/>
            <span class="modal-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="website">Website</label>
            <input id="website" class="modal-website" name="website" type="url" placeholder="trade.poseidon.local" required/>
            <span class="modal-error"></span>
        </div>

        <div class="modal-group">
            <div class="modal-label"></div>
            <div class="modal-button">
                <div class="button-dismiss">
                    <button class="btn btn-danger modal-dismiss" type="submit" data-action="dismiss">Cancel</button>
                </div>
                <div class="button-submit">
                    <button class="btn btn-primary modal-submit" type="submit" data-action="submit">Submit</button>
                </div>
            </div>
        </div>
    </div>
</div>
