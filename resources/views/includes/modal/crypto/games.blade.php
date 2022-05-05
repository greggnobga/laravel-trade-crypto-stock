<div class="crypto-game-wrapper">
    <div class="crypto-modal">
        <div class="modal-group">
            <h2 class="modal-header"></h2>
            <span class="modal-buffer"></span>
            <span class="modal-dismiss" data-action="dismiss">X</span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" value="0" placeholder="ID" disabled/>
            <span class="modal-error modal-id-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="title">Title</label>
            <input id="title" class="modal-title" name="title" type="text" placeholder="Yo Hero" required/>
            <span class="modal-error modal-title-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="genre">Genre</label>
            <input id="genre" class="modal-genre" name="genre" type="text" placeholder="Strategy" required/>
            <span class="modal-error modal-genre-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="platform">Platform</label>
            <input id="platform" class="modal-platform" name="platform" type="text" placeholder="PC" required/>
            <span class="modal-error modal-platform-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="blockchain">Blockchain</label>
            <input id="blockchain" class="modal-blockchain" name="blockchain" type="text" placeholder="Binance Smart Chain" required/>
            <span class="modal-error modal-blockchain-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="status">Status</label>
            <input id="status" class="modal-status" name="status" type="text" placeholder="Beta" required/>
            <span class="modal-error modal-status-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="earn">Earn</label>
            <input id="earn" class="modal-earn" name="earn" type="text" placeholder="Yes" required/>
            <span class="modal-error modal-earn-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="free">Free</label>
            <input id="free" class="modal-free" name="free" type="text" placeholder="No" required/>
            <span class="modal-error modal-free-error"></span>
        </div>

        <div class="modal-group">
            <label class="modal-label" for="rating">Rating</label>
            <input id="rating" class="modal-rating" name="rating" type="number" placeholder="0" required/>
            <span class="modal-error modal-rating-error"></span>
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
