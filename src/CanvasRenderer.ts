// This file is part of charto-render, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import { BBox, Layer, LayerFeatures } from 'charto-model';

export class CanvasRenderer {

	render(
		canvas: HTMLCanvasElement,
		features: LayerFeatures,
		bbox: BBox,
		pixelWidth: number,
		pixelHeight: number,
		zoom?: number
	) {
		const gc = canvas.getContext('2d')!;

		gc.beginPath();
		gc.rect(0, 0, pixelWidth, pixelHeight);
		gc.lineWidth = 2;
		gc.strokeStyle = '#000000';
		gc.stroke();

		gc.font = '20px sans-serif';
		gc.fillStyle = '#000000';
		gc.fillText(bbox.s + ' / ' + bbox.w + ' / ' + zoom, 0, 16);
	}

}
