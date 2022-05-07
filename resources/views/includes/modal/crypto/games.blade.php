<div class="crypto-game-insert">
    <div class="crypto-modal">
        <div class="modal-group">
            <h2 class="modal-header">Insert Game</h2>
            <span class="modal-buffer"></span>
            <span class="modal-dismiss">X</span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" value="0" placeholder="ID" disabled/>
            <span class="modal-error modal-id-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="title">Title</label>
            <input id="title" class="modal-title" name="title" type="text" placeholder="Yo Hero" value="" required/>
            <span class="modal-error modal-title-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="genre">Genre</label>
            <input id="genre" class="modal-genre" name="genre" type="text" placeholder="Strategy" value="" required/>
            <span class="modal-error modal-genre-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="platform">Platform</label>
            <input id="platform" class="modal-platform" name="platform" type="text" placeholder="PC" value="" />
            <span class="modal-error modal-platform-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="blockchain">Blockchain</label>
            <input id="blockchain" class="modal-blockchain" name="blockchain" type="text" placeholder="Binance Smart Chain" value="" required/>
            <span class="modal-error modal-blockchain-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="status">Status</label>
            <input id="status" class="modal-status" name="status" type="text" placeholder="Beta" value="" required/>
            <span class="modal-error modal-status-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="earn">Earn</label>
            <input id="earn" class="modal-earn" name="earn" type="text" placeholder="Yes" value="" required/>
            <span class="modal-error modal-earn-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="free">Free</label>
            <input id="free" class="modal-free" name="free" type="text" placeholder="No" value="" required/>
            <span class="modal-error modal-free-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="rating">Rating</label>
            <input id="rating" class="modal-rating" name="rating" type="number" placeholder="0" value="" required/>
            <span class="modal-error modal-rating-error"></span>
        </div>

        <div class="modal-group">
            <div class="modal-label"></div>
            <div class="modal-button">
                <div class="button-dismiss">
                    <button class="btn btn-danger modal-dismiss" type="submit">Cancel</button>
                </div>
                <div class="button-submit">
                    <button class="btn btn-primary modal-submit" type="submit">Submit</button>
                </div>
            </div>
        </div>
    </div>
</div>
