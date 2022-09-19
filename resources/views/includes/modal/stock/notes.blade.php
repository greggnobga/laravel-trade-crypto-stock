<div class="stock-note-insert">
    <div class="modal-form">
        <div class="modal-group">
            <h2 class="modal-header">Add Record</h2>
            <span class="modal-buffer"></span>
            <span class="modal-close">X</span>
        </div>
        <div class="modal-group">
            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" placeholder="0" value="0" disabled/>
            <input id="status" class="modal-status" name="status" type="hidden" placeholder="Status" value="0" disabled/>
        </div>
        <div class="modal-group">
            <label class="modal-note-label" for="note">Note</label>
            <textarea id="note" class="modal-note" name="note" type="text" placeholder="Type your trading note..." rows="4" cols="50" required></textarea>
            <span class="modal-error modal-note-error"></span>
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